import React from "react";
import { Popover } from "@headlessui/react";
import {
  format,
  subDays,
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns";

type DateRange = { start: Date; end: Date };

type Props = {
  value?: DateRange;
  onChange: (value: DateRange) => void;
  className?: string;
};

const DateRangePicker = (props: Props) => {
  const startDate = props.value?.start ?? new Date();
  const endDate = props.value?.end ?? new Date();
  const rangePresets = getRangePresets();

  return (
    <div className={props.className}>
      <div className="relative inline-block w-full whitespace-nowrap text-left">
        <Popover>
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`block w-full rounded-md border border-gray-600 px-4 py-2 font-medium dark:border-gray-300 sm:text-sm ${
                  open
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground"
                }`}
              >
                {`${formatDate(startDate)} → ${formatDate(endDate)}`}
              </Popover.Button>
              <Popover.Panel className="absolute z-10 mt-2 rounded-lg border border-primary-400 bg-background shadow-lg shadow-primary-500">
                <div className="flex flex-col p-4">
                  <div className="flex items-center justify-between gap-2 text-sm font-bold">
                    <input
                      type="date"
                      name="start"
                      value={format(startDate, "yyyy-MM-dd")}
                      onChange={(e) =>
                        props.onChange({
                          start: e.target.valueAsDate ?? new Date(),
                          end: endDate,
                        })
                      }
                      className="block w-48 rounded-md border border-gray-600 bg-transparent p-2 text-center text-foreground dark:border-gray-300"
                    />
                    <span className="text-base font-bold">→</span>
                    <input
                      type="date"
                      name="end"
                      value={format(endDate, "yyyy-MM-dd")}
                      onChange={(e) =>
                        props.onChange({
                          start: startDate,
                          end: e.target.valueAsDate ?? new Date(),
                        })
                      }
                      className="block w-48 rounded-md border border-gray-600 bg-transparent p-2 text-center text-foreground dark:border-gray-300"
                    />
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    {rangePresets.map((range, index) => (
                      <button
                        key={index}
                        className="whitespace-nowrap rounded border border-gray-500 px-2 py-1 text-sm transition-all duration-100 ease-in-out hover:bg-primary-800 hover:text-white hover:dark:bg-white hover:dark:text-black"
                        onClick={() => {
                          props.onChange(range.value);
                          close();
                        }}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default DateRangePicker;

export const formatDate = (date: Date) => {
  return format(date, "MMM dd, yyyy");
};

const getRangePresets = () => {
  const today = new Date();
  const prevYear = new Date(today.getFullYear() - 1, 0, 1);
  const prevMonth = subMonths(today, 1);

  return [
    {
      label: "Yesterday",
      value: {
        start: subDays(today, 1),
        end: subDays(today, 1),
      },
    },
    {
      label: "Last 7 days",
      value: {
        start: subDays(today, 7),
        end: today,
      },
    },
    {
      label: "Last 28 days",
      value: {
        start: subDays(today, 28),
        end: today,
      },
    },
    {
      label: "Last 365 days",
      value: {
        start: subDays(today, 365),
        end: today,
      },
    },
    {
      label: format(today, "MMM, yyyy"),
      value: {
        start: startOfMonth(today),
        end: endOfMonth(today),
      },
    },
    {
      label: format(prevMonth, "MMM, yyyy"),
      value: {
        start: startOfMonth(prevMonth),
        end: endOfMonth(prevMonth),
      },
    },
    {
      label: `Prev. Year (${prevYear.getFullYear()})`,
      value: {
        start: startOfYear(prevYear),
        end: endOfYear(prevYear),
      },
    },
    {
      label: `Curr. Year (${today.getFullYear()})`,
      value: {
        start: startOfYear(today),
        end: endOfYear(today),
      },
    },
  ];
};
