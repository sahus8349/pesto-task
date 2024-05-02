import React,{useEffect, useState} from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { startOfDay } from "date-fns";
import { enUS } from "date-fns/locale";
// import { ReactComponent as Calender } from "../../../src/images/calender.svg";
import styled from "styled-components";

export const DatePickerStyle = styled.div`
  .react-datepicker__day--today{
    background-color: #F15845;
    color:#FFF;
    border-radius:0.3rem;
  }
  .react-datepicker__header{
    background-color: #fff;
    border: none;
    padding-top: 20px;
  }
  .react-datepicker__navigation{
    align-items: center;
    display: flex;
    padding: 0;
    text-align: center;
    top: 17px;
  }
  .react-datepicker__navigation-icon:before{
    border-color: #232323;
    border-width: 1.5px 1.5px 0 0;
  }
  .react-datepicker__triangle:after{
    border-bottom-color:#FFF;
  }
  .react-datepicker__triangle:before{
    border-bottom-color:#aeaeae;
  }
  .react-datepicker__day--selected{
    background-color: #F15845;
    color:#FFF
  }
`;

registerLocale("en-US", enUS);

export interface DateTimePickerProps {
  selectedDate: Date | null | string;
  onChange: (date: Date | null,value: string | null) => void;
  includeTime?: boolean;
  size?: string;
  name?: string;
  placeholder?: string;
  dateFormat?: string;
  disabled?: boolean;
  closeOnScroll?:boolean;
  peekNextMonth?:boolean;
  showMonthDropdown?:boolean;
  showYearDropdown?:boolean;
  dropdownMode?:string;
  minDate?:Date | string | null
  maxDate?:Date | string | null
}

export const CustomDateTimePicker: React.FC<DateTimePickerProps> = ({
  selectedDate,
  onChange,
  includeTime = false,
  size,
  name,
  placeholder,
  dateFormat,
  disabled,
  minDate,
  maxDate,
  closeOnScroll,
  peekNextMonth,
  showMonthDropdown,
  showYearDropdown,
  dropdownMode,
}) => {
  const minDateShow = minDate !== undefined && minDate !== null?startOfDay(new Date(minDate)):null;
  const maxDateShow = maxDate !== undefined && maxDate !== null?startOfDay(new Date(maxDate)):null;
  const [selected,setSelected] = useState<Date | null>(null);
  dropdownMode;

  useEffect(()=>{
    if(selectedDate === ""){
      selectedDate = null;
    }
    if(selectedDate !== null){
      const date = new Date(selectedDate);
      setSelected(date)
    }
  },[selectedDate]);

  const selectDateFormat = includeTime ? "dd/MM/yyyy h:mm aa" : "dd/MM/yyyy";
  dateFormat = dateFormat?dateFormat:selectDateFormat;

  const handleChange = (date: Date | null) => {
    let value = null;
    if(date !== null){
      setSelected(date);
      value = moment(date).format(dateFormat);
    }else{
      setSelected(null);
    }

    onChange(date,value);
  }

  return (
    <>
      <DatePickerStyle>
        <label className="relative block">
          <DatePicker
            name={name}
            selected={selected}
            disabled={disabled}
            onChange={handleChange}
            dateFormat={selectDateFormat}
            showTimeInput={includeTime}
            locale="en-US"
            minDate={minDateShow}
            maxDate={maxDateShow}
            closeOnScroll={closeOnScroll}
            peekNextMonth={peekNextMonth}
            showMonthDropdown={showMonthDropdown}
            showYearDropdown={showYearDropdown}
            // dropdownMode={dropdownMode}
            className={`
            outline-none w-full bg-white border border-gray-100 px-4 py-3 text-500 font-normal rounded-md text-gray-300 placeholder:text-gray-700 
            focus:border-secondary-100 focus:shadow-200
            disabled:bg-gray-200 pr-10 h-[2.9rem]
            ${size === "sm" ? "!py-2 !px-3 !text-200 small-datepicker" : ""}
            `}
            wrapperClassName="w-full block"
            placeholderText={placeholder!==undefined?placeholder:"Select date"}
            // popperPlacement="bottom-end"
            calendarClassName="[&>div:first-child]:!translate-x-12"
          />
          <span
            className={`date-time-picker-button absolute right-3 top-3 ${
              size === "sm" ? "!w-4 !h-4 !top-2 !right-2" : ""
            }`}
          >
            {/* <Calender
              className={`calendar-icon ${size === "sm" ? "!w-4 !h-4 " : ""}`}
            /> */}
          </span>
        </label>
      </DatePickerStyle>
    </>
  );
};
