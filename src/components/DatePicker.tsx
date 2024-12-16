import React from "react";

type DatePickerProps = {
    dateValue: { from: string, to: string },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,

}
const DatePicker = (props: DatePickerProps) => {
    return <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
            <label htmlFor="from" className="text-sm font-medium">
                From:
            </label>
            <input
                type="date"
                name="from"
                value={props.dateValue.from}
                onChange={props.onChange}
                className="border rounded px-2 py-1 text-sm"
            />
        </div>
        <div className="flex items-center gap-2">
            <label htmlFor="to" className="text-sm font-medium">
                To:
            </label>
            <input
                type="date"
                name="to"
                value={props.dateValue.to}
                onChange={props.onChange}
                className="border rounded px-2 py-1 text-sm"
            />
        </div>
    </div>;
}

export default DatePicker;