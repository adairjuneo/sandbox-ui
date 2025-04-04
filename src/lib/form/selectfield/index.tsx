// import './styles.scss';

import React from 'react';
import { createPortal } from 'react-dom';
import { v1 } from 'uuid';

// APAGAR ----------------------------------------------------------

// ✅ Bloquear o acesso ao body utilizando portal, posicionando o listbox abaixo do selectfield e calculando onde ele está para posicionar.
// ✅ Desabilitar o evento de scroll fora do listbox, assim eh posivel garantir que não ira sair de posicao os elementos do portal.
// ❔ Encontrar forma de vincular o {...register} do useForm(formulario) nesse componente de SelectField.

const listaTeste = new Array(100).fill({}).map((_, index) => ({
  value: String(index + 1),
  label: String('Valor Teste ').concat(String(index + 1)),
}));
// -----------------------------------------------------------------

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

interface SelectFieldInputProps extends React.ComponentProps<'input'> {
  hint?: string | string[];
  label?: string;
  errors?: string[];
}

const SELECT_FIELD_CONTROLS_ID = `select-field-controls-${v1()}`;
export const Input = React.forwardRef<HTMLInputElement, SelectFieldInputProps>(
  (props, ref) => {
    const { name, label, errors, children, ...rest } = props;
    const [listBoxOpen, setListBoxOpen] = React.useState(false);
    const [activeDescendant, setActiveDescendant] = React.useState<
      string | undefined
    >(undefined);
    const selectContainerRef = React.useRef<HTMLDivElement | null>(null);
    const selectListBoxRef = React.useRef<HTMLDivElement | null>(null);
    const selectInputRef = React.useRef<HTMLInputElement | null>(null);
    const optionsRef = React.useRef<HTMLLIElement[]>([]);

    const leftSlotElements: React.ReactNode[] = [];
    const rightSlotElements: React.ReactNode[] = [];

    const hasLeftSlotElements = Boolean(leftSlotElements?.length);
    const hasRightSlotElements = Boolean(rightSlotElements?.length);
    const hasValidationErrors = Boolean(errors?.length);
    const hasHintMessages = Boolean(props.hint?.length);
    const isReadOnly = Boolean(props.readOnly);
    const selectPositionOnScreen =
      selectContainerRef.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
        width: 'auto',
      };

    const listBoxStyles: React.CSSProperties = {
      top: selectPositionOnScreen.top,
      left: selectPositionOnScreen.left,
      minWidth: selectPositionOnScreen.width,
    };

    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement<SelectFieldSlotProps>(child) &&
        child.type === Slot
      ) {
        const slot = React.cloneElement(child);
        switch (child.props.position) {
          case 'left':
            leftSlotElements.push(slot);
            break;
          case 'right':
            rightSlotElements.push(slot);
            break;
          default:
            break;
        }
      }
    });

    const createListBoxWithPortal = () => {
      return createPortal(
        <div
          ref={selectListBoxRef}
          id={SELECT_FIELD_CONTROLS_ID}
          style={listBoxStyles}
          aria-expanded={listBoxOpen}
          className="select-field-listbox"
        >
          <ul role="listbox" aria-label={label} id={SELECT_FIELD_CONTROLS_ID}>
            {listaTeste.map((item, index) => {
              return (
                <li
                  ref={(el) => {
                    if (el) optionsRef.current[index] = el;
                  }}
                  aria-selected={activeDescendant === item.value}
                  role="option"
                  key={item.value}
                  id={item.value}
                  value={item.value}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>,
        document.body
      );
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!listBoxOpen) {
        if (
          event.key === 'ArrowDown' &&
          selectInputRef.current === document.activeElement
        ) {
          event.preventDefault();
          event.stopPropagation();
          setListBoxOpen(true);
        }
      }

      const currentIndex = optionsRef.current.findIndex(
        (option) => option.id === activeDescendant
      );
      let nextIndex = currentIndex;

      if (listBoxOpen) {
        if (event.key === 'Escape') {
          event.preventDefault();
          setListBoxOpen(false);
          selectInputRef.current?.focus();
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          nextIndex = Math.min(currentIndex + 1, optionsRef.current.length - 1);
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          nextIndex = Math.max(currentIndex - 1, 0);
        } else if (event.key === 'Enter' && activeDescendant) {
          event.preventDefault();
          const selectedOption = optionsRef.current[nextIndex];
          if (selectedOption) {
            selectedOption.click();
          }
        }

        const nextOption = optionsRef.current[nextIndex];
        if (nextOption) {
          setActiveDescendant(nextOption.id);
          nextOption.scrollIntoView({ block: 'nearest' });
        }
      } else return {};
    };

    React.useEffect(() => {
      if (listBoxOpen) {
        const listBoxWithItens = selectListBoxRef.current?.firstElementChild;
        if (listBoxWithItens?.childNodes.length) {
          const listOfSelectableItens = Array.from(
            listBoxWithItens?.childNodes
          ) as HTMLLIElement[];
          optionsRef.current = listOfSelectableItens;

          const currentIndex = listOfSelectableItens.findIndex(
            (option) => option.ariaSelected === 'true'
          );
          const nextOption = optionsRef.current[currentIndex];
          if (nextOption) {
            setActiveDescendant(nextOption.id);
            nextOption.scrollIntoView({ block: 'nearest', behavior: 'auto' });
          }
        }
      }

      const handleScroll = (event: Event) => {
        if (listBoxOpen && selectListBoxRef.current) {
          if (!selectListBoxRef.current.contains(event.target as Node)) {
            event.preventDefault();
          }
        }
      };

      const currentScrollWidthSize = String(
        window.innerWidth - document.documentElement.clientWidth
      ).concat('px');

      if (listBoxOpen) {
        document.body.style.overflow = 'hidden';
        document.body.style.setProperty(
          'margin-right',
          currentScrollWidthSize,
          'important'
        );
        document.addEventListener('wheel', handleScroll, { passive: false });
        document.addEventListener('touchmove', handleScroll, {
          passive: false,
        });
      } else {
        document.body.style.overflow = '';
        document.body.style.removeProperty('margin-right');
        document.removeEventListener('wheel', handleScroll);
        document.removeEventListener('touchmove', handleScroll);
      }

      return () => {
        document.body.style.overflow = '';
        document.body.style.removeProperty('margin-right');
        document.removeEventListener('wheel', handleScroll);
        document.removeEventListener('touchmove', handleScroll);
      };
    }, [listBoxOpen]);

    return (
      <div className="select-field-root" data-state-error={hasValidationErrors}>
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
            onKeyDown={handleKeyDown}
            id={name}
            tabIndex={!isReadOnly ? 0 : -1}
            className="select-field-input"
            placeholder={!label ? name : rest.placeholder}
            data-state-error={hasValidationErrors}
            data-state-read-only={isReadOnly}
            {...rest}
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
                setListBoxOpen((prevState) => !prevState);
                selectInputRef.current?.focus();
              }}
            >
              🔽
            </button>
          </div>
          {listBoxOpen && createListBoxWithPortal()}
        </div>
        <span className="select-field-error">
          {errors?.map((error) => error)}
        </span>
      </div>
    );
  }
);

Input.displayName = 'SelectFieldInput';
