import './styles.scss';

import { ChevronDown } from 'lucide-react';
import React from 'react';
import { createPortal } from 'react-dom';
import { v1 } from 'uuid';

interface SelectFieldContextProps {
  label?: string;
  listBoxOpen: boolean;
  filterValue?: string;
  nameSelect?: string;
  valueSelect?: string;
  activeDescendant?: string;
  handleOnChangeForm?: (value?: string, label?: string) => void;
  selectContainerRef: React.RefObject<HTMLDivElement | null>;
}

const SelectFieldContext = React.createContext({} as SelectFieldContextProps);

interface SelectFieldListBoxProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

export const ListBox = React.forwardRef<
  HTMLDivElement,
  SelectFieldListBoxProps
>((props, ref) => {
  const { children, ...rest } = props;
  const { label, listBoxOpen, selectContainerRef } =
    React.useContext(SelectFieldContext);

  const [listBoxStyles, setListBoxStyles] = React.useState<React.CSSProperties>(
    {}
  );

  React.useEffect(() => {
    // const selectPositionOnScreen =
    //   selectContainerRef.current?.getBoundingClientRect();

    // setListBoxStyles((prevState) => ({
    //   ...prevState,
    //   top: selectPositionOnScreen?.top,
    //   left: selectPositionOnScreen?.left,
    //   minWidth: selectPositionOnScreen?.width,
    // }));

    const updatePosition = () => {
      const selectPositionOnScreen =
        selectContainerRef.current?.getBoundingClientRect();
      if (selectPositionOnScreen) {
        setListBoxStyles({
          top: selectPositionOnScreen.top + window.scrollY,
          left: selectPositionOnScreen.left + window.scrollX,
          minWidth: selectPositionOnScreen.width,
          position: 'absolute',
        });
      }
    };

    if (listBoxOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true); // capture phase
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [listBoxOpen, selectContainerRef]);

  return (
    <div
      ref={ref}
      style={listBoxStyles}
      aria-expanded={listBoxOpen}
      className="select-field-listbox"
      {...rest}
    >
      <ul role="listbox" aria-label={label} id={SELECT_FIELD_CONTROLS_ID}>
        {children}
      </ul>
    </div>
  );
});

interface SelectFieldSlotProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  position: 'left' | 'right';
}

export const Slot = React.forwardRef<HTMLDivElement, SelectFieldSlotProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    return (
      <div
        ref={ref}
        data-state-position={props.position}
        className="select-field-slot"
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Slot.displayName = 'SelectFieldSlot';

interface SelectFieldItemProps extends React.ComponentProps<'li'> {
  value: string;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Item = React.forwardRef<HTMLLIElement, SelectFieldItemProps>(
  (props, ref) => {
    const { disabled, children } = props;
    const { filterValue, valueSelect, activeDescendant, handleOnChangeForm } =
      React.useContext(SelectFieldContext);

    const isInFocus = Boolean(activeDescendant === props.value);
    const ariaSelected = Boolean(props.value === valueSelect);
    const hasPartOfFilter = Boolean(
      String(props.label)
        .toLowerCase()
        .includes(filterValue?.toString().toLowerCase() ?? '')
    );

    return (
      <li
        ref={ref}
        key={props.value}
        id={props.value}
        hidden={props.hidden || !hasPartOfFilter}
        tabIndex={!disabled ? 0 : -1}
        aria-selected={ariaSelected}
        aria-hidden={props['aria-hidden'] || !hasPartOfFilter}
        aria-disabled={disabled}
        data-content-value={props.value}
        data-content-label={props.label}
        data-state-in-focus={isInFocus}
        data-state-filtered={hasPartOfFilter}
        role="option"
        onClick={() => {
          handleOnChangeForm?.(props.value, props.label);
        }}
        onMouseDown={(event) => {
          event.preventDefault();
        }}
        {...props}
      >
        {children}
      </li>
    );
  }
);
Item.displayName = 'SelectFieldItem';

interface SelectFieldInputProps extends React.ComponentProps<'input'> {
  label?: string;
  errors?: string[];
}

const NAVIGATION_KEYS = ['Escape', 'ArrowDown', 'ArrowUp', 'Enter'];
const SELECT_FIELD_CONTROLS_ID = `select-field-controls-${v1()}`;
export const Input = React.forwardRef<HTMLInputElement, SelectFieldInputProps>(
  (props, ref) => {
    const {
      name,
      label,
      errors,
      children,
      onChange: onChangeForm,
      ...rest
    } = props;

    const [inputValue, setInputValue] = React.useState('');
    const [filterValue, setFilterValue] = React.useState('');
    const [listBoxOpen, setListBoxOpen] = React.useState(false);
    const [activeDescendant, setActiveDescendant] = React.useState<string>();

    const selectContainerRef = React.useRef<HTMLDivElement | null>(null);
    const selectListBoxRef = React.useRef<HTMLDivElement | null>(null);
    const selectInputRef = React.useRef<HTMLInputElement | null>(null);

    const hasValidationErrors = Boolean(errors?.length);
    const isReadOnly = Boolean(props.readOnly);

    const { leftSlotElements, rightSlotElements } = React.useMemo(() => {
      const left: React.ReactNode[] = [];
      const right: React.ReactNode[] = [];

      React.Children.forEach(children, (childElement) => {
        if (
          React.isValidElement<SelectFieldSlotProps>(childElement) &&
          childElement.type === Slot
        ) {
          const listOfChild = React.cloneElement(childElement, {
            key: childElement.key ?? childElement.props.position,
          });
          (childElement.props.position === 'left' ? left : right).push(
            listOfChild
          );
        }
      });

      return { leftSlotElements: left, rightSlotElements: right };
    }, [children]);

    const hasLeftSlotElements = Boolean(leftSlotElements?.length);
    const hasRightSlotElements = Boolean(rightSlotElements?.length);

    const handleOnChangeForm = (value?: string, label?: string) => {
      const syntheticEvent = {
        target: {
          name,
          value,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChangeForm?.(syntheticEvent);
      setListBoxOpen(false);
      setFilterValue('');
      setInputValue(label ?? '');
    };

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setListBoxOpen(false);
      setFilterValue('');
      props?.onBlur?.(event);
    };

    const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setListBoxOpen(true);
      props?.onFocus?.(event);
    };

    const handleOnChangeInput = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setFilterValue(event.target.value);
      setInputValue(event.target.value);
    };

    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      props?.onKeyDown?.(event);

      if (!listBoxOpen) {
        if (
          event.key === 'ArrowDown' &&
          selectInputRef.current === document.activeElement
        ) {
          event.preventDefault();
          setListBoxOpen(true);
          setActiveDescendant(props.value?.toString() ?? undefined);
        }
      }

      if (listBoxOpen && NAVIGATION_KEYS.includes(event.key)) {
        event.preventDefault();
      }

      requestAnimationFrame(() => {
        const ulListElement = selectListBoxRef.current?.firstElementChild;

        const liElementsFiltered = (ulListElement?.querySelectorAll(
          'li[data-state-filtered="true"]'
        ) ?? []) as HTMLLIElement[];

        const currentElementIndex = Array.from(liElementsFiltered).findIndex(
          (liElement) => liElement.id === activeDescendant
        );

        let nextElementIndex = currentElementIndex;

        if (listBoxOpen) {
          if (NAVIGATION_KEYS.includes(event.key)) {
            if (event.key === 'Escape') {
              setListBoxOpen(false);
              setFilterValue('');
              selectInputRef.current?.focus();
            } else if (event.key === 'ArrowDown') {
              nextElementIndex = Math.min(
                currentElementIndex + 1,
                liElementsFiltered.length - 1
              );
            } else if (event.key === 'ArrowUp') {
              nextElementIndex = Math.max(currentElementIndex - 1, 0);
            } else if (event.key === 'Enter' && activeDescendant) {
              const selectedLIOption = liElementsFiltered[nextElementIndex];
              if (selectedLIOption) {
                selectedLIOption.click();
              }
            }

            const nextLIOption = liElementsFiltered[nextElementIndex];
            if (nextLIOption) {
              setActiveDescendant(nextLIOption?.id ?? '');
              nextLIOption.scrollIntoView({ block: 'nearest' });
            }
          } else {
            const firstLIOption = liElementsFiltered[0];
            setActiveDescendant(firstLIOption?.id ?? '');
          }
        } else return null;
      });
    };

    const contextValues = React.useMemo(
      () => ({
        label: props.label,
        listBoxOpen,
        filterValue,
        nameSelect: props.name?.toString(),
        valueSelect: props.value?.toString(),
        activeDescendant,
        handleOnChangeForm,
        selectContainerRef,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [listBoxOpen, filterValue, props.name, props.value, activeDescendant]
    );

    return (
      <SelectFieldContext.Provider value={contextValues}>
        <div
          className="select-field-root"
          data-state-error={hasValidationErrors}
        >
          {label && (
            <label className="select-field-label" title={label} htmlFor={name}>
              {label}
            </label>
          )}
          <div
            ref={selectContainerRef}
            className="select-field-container"
            aria-expanded={listBoxOpen}
          >
            {hasLeftSlotElements && leftSlotElements}
            <input
              ref={(element) => {
                if (element) {
                  selectInputRef.current = element;
                  if (typeof ref === 'function') {
                    ref(element);
                  } else if (ref) {
                    ref.current = element;
                  }
                }
              }}
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={listBoxOpen}
              aria-controls={SELECT_FIELD_CONTROLS_ID}
              aria-activedescendant={activeDescendant}
              tabIndex={!isReadOnly ? 0 : -1}
              className="select-field-input"
              placeholder={!label ? name : rest.placeholder}
              data-state-error={hasValidationErrors}
              data-state-read-only={isReadOnly}
              {...rest}
              id={name}
              value={inputValue}
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
              onKeyDown={handleOnKeyDown}
              onChange={handleOnChangeInput}
            />
            {hasRightSlotElements && rightSlotElements}
            <div className="select-field-trigger">
              <button
                type="button"
                tabIndex={-1}
                aria-label={label}
                aria-expanded={listBoxOpen}
                aria-controls={SELECT_FIELD_CONTROLS_ID}
                onClick={() => {
                  setListBoxOpen((prevState) => {
                    if (prevState) {
                      setFilterValue('');
                    }
                    return !prevState;
                  });
                }}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
              >
                <ChevronDown />
              </button>
            </div>
            {listBoxOpen &&
              createPortal(
                <ListBox ref={selectListBoxRef}>{children}</ListBox>,
                document.body
              )}
          </div>
          <span className="select-field-error">
            {errors?.map((error) => error)}
          </span>
        </div>
      </SelectFieldContext.Provider>
    );
  }
);

Input.displayName = 'SelectFieldInput';

/* 
  - Encontrar uma solução para exibir o indicador de "Nenhuma opção encontrada." na listbox caso filtro retorne 0(zero) resultados.

  {filtroResultados.length === 0 && (
    <li
      tabIndex={-1}
      aria-disabled={true}
      key="not-found-values"
      role="option"
      id="not-found-values"
      className="listbox-item-not-found-values">
      {notFoundValuesText}
    </li>
  )}

*/
