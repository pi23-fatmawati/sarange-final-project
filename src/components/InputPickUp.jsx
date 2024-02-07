export default function InputPickUp(props) {
  // Mendapatkan tanggal saat ini dalam format YYYY-MM-DD
  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];

  // Mendapatkan tanggal besok dalam format YYYY-MM-DD
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowISO = tomorrow.toISOString().split("T")[0];

  // Mendapatkan tanggal 2 hari setelah ini dalam format YYYY-MM-DD
  const twoDaysLater = new Date(today);
  twoDaysLater.setDate(twoDaysLater.getDate() + 2);
  const twoDaysLaterISO = twoDaysLater.toISOString().split("T")[0];

  // Mendapatkan tanggal 3 hari setelah ini dalam format YYYY-MM-DD
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);
  const threeDaysLaterISO = threeDaysLater.toISOString().split("T")[0];

  return (
    <div className="flex flex-col w-full gap-2 border border-solid border-grey-2 rounded-lg p-4">
      <div className="font-medium p-1">{props.title}</div>
      {props.type === "date" && (
        <input
          className="rounded-lg"
          type="date"
          min={twoDaysLaterISO}
          max={threeDaysLaterISO}
        />
      )}
      {props.subtitle && <div className="subtitle">{props.subtitle}</div>}
    </div>
  );
}

// export default function InputPickUp(props) {
//   // Mendapatkan tanggal saat ini dalam format YYYY-MM-DD untuk digunakan sebagai nilai minimal
//   const currentDate = new Date().toISOString().split("T")[0];

//   return (
//     <div className="flex flex-col w-full gap-2 border border-solid border-grey-2 rounded-lg p-4">
//       <div className="font-medium p-1">{props.title}</div>
//       {props.type === "date" && (
//         <input className="rounded-lg" type="date" min={currentDate} />
//       )}
//       {props.subtitle && <div className="subtitle">{props.subtitle}</div>}
//     </div>
//   );
// }
