import styled from 'styled-components';

import { Check } from 'components/Icons/Check';
import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { FilterState, Option } from 'modules/filters/interface';
import React from 'react';
import { slide as Slide } from 'react-burger-menu';
import { useIntl } from 'react-intl';

import { CloseButton } from './CloseButton';

const OptionItem = ({
  option,
  isSelected,
  selectOption,
  deSelectOption,
}: {
  option: Option;
  isSelected: boolean;
  selectOption: (optionToSelect: Option) => void;
  deSelectOption: (optionToDeselect: Option) => void;
}) => {
  const onClick = () => (isSelected ? deSelectOption(option) : selectOption(option));
  return (
    <div
      className="flex justify-between border-b border-solid border-greySoft items-center"
      onClick={onClick}
    >
      <div className="flex items-center">
        {option.pictogramUrl !== undefined && (
          <Picto
            className={`mr-2 rounded-full p-1 ${isSelected ? 'bg-primary1' : 'bg-greyDarkColored'}`}
          >
            <img src={option.pictogramUrl} className="w-5 h-5" />
          </Picto>
        )}
        <Label
          key={option.value}
          className={`flex items-center pt-4 pb-4 font-bold outline-none pb-2 ${
            isSelected ? 'text-primary1' : 'text-greyDarkColored'
          }`}
        >
          {option.label}
        </Label>
      </div>
      {isSelected && <Check size={24} />}
    </div>
  );
};

const Label = styled.span`
  transition: color 150ms ease-in-out;
`;

const Picto = styled.div`
  transition: background-color 150ms ease-in-out;
`;

interface Props {
  menuState: 'DISPLAYED' | 'HIDDEN';
  handleClose: () => void;
  filterId: string | null;
  closeMenu: () => void;
  filterState: FilterState | null;
  selectOption: (option: Option) => void;
  deSelectOption: (option: Option) => void;
}

export const MobileFilterSubMenu: React.FC<Props> = ({
  menuState,
  handleClose,
  closeMenu,
  filterId,
  filterState,
  selectOption,
  deSelectOption,
}) => {
  const intl = useIntl();
  const selectedOptionsValue = filterState?.selectedOptions.map(({ value }) => value);
  const isOptionSelected = (option: Option) =>
    selectedOptionsValue ? selectedOptionsValue.includes(option.value) : false;
  return (
    /*
     * The library default behaviour is to have a fixed close icon which
     * made the icon overlap with the menu content as we scrolled.
     * To fix this issue we use our own close button which scrolls along
     * the content and imperatively closes the drawer.
     */
    <Slide
      isOpen={menuState === 'DISPLAYED'}
      onClose={handleClose}
      right
      customBurgerIcon={false}
      customCrossIcon={false}
      burgerBarClassName="bg-white"
      menuClassName="bg-white p-4"
    >
      <div className="relative text-center w-full pb-4 font-bold border-b border-solid border-greySoft outline-none">
        <CloseButton
          onClick={closeMenu}
          className="absolute left-0"
          icon={<ArrowLeft size={24} />}
        />
        {filterId !== null && (
          <span>
            {filterId === 'type1' || filterId === 'type2'
              ? filterState?.label
              : intl.formatMessage({ id: `search.filters.${filterId}` })}
          </span>
        )}
      </div>
      {filterState?.options.map(option => (
        <OptionItem
          key={option.value}
          option={option}
          isSelected={isOptionSelected(option)}
          selectOption={selectOption}
          deSelectOption={deSelectOption}
        />
      ))}
    </Slide>
  );
};
