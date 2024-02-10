import React from "react";

export default function InputPickUp(props) {
  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowISO = tomorrow.toISOString().split("T")[0];

  const twoDaysLater = new Date(today);
  twoDaysLater.setDate(twoDaysLater.getDate() + 2);
  const twoDaysLaterISO = twoDaysLater.toISOString().split("T")[0];

  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);
  const threeDaysLaterISO = threeDaysLater.toISOString().split("T")[0];

  // Format tanggal menjadi YYYY-MM-DD
  const formattedDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Handler untuk onChange
  const handleDateChange = (e) => {
    props.onChange(e); // Memanggil properti onChange yang diteruskan dari parent komponen
  };

  return (
    <div className="flex flex-col w-full gap-2 border border-solid border-grey-2 rounded-lg p-4">
      <div className="font-medium p-1">{props.title}</div>
      {props.type === "date" && (
        <input
          className="rounded-lg"
          type="date"
          min={formattedDate(twoDaysLater)}
          max={formattedDate(threeDaysLater)}
          value={props.value} // Menetapkan nilai dari props.value
          onChange={handleDateChange} // Memanggil handleDateChange saat ada perubahan nilai
        />
      )}
      {props.subtitle && <div className="subtitle">{props.subtitle}</div>}
    </div>
  );
}
