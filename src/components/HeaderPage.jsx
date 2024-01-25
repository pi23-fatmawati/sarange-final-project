export default function HeaderPage(props) {
  return (
    <div>
      <h1 className="text-2xl font-medium mb-1">
        {props.title}
      </h1>
      <p className="mb-2">
        {props.subtitle}
      </p>
    </div>
  );
}
