export default function InputPickUp(props) {
  return (
    <div className="flex flex-col w-full gap-2 border border-solid border-grey-2 rounded-lg p-4">
      <div className="font-medium p-1">{props.title}</div>
      {props.type && <input className="rounded-lg" type={props.type} />}
      {props.subtitle && <div className="subtitle">{props.subtitle}</div>}
    </div>
  );
}
