
interface Props {
  name: string,
  sername: string,
  getName(): void,
}

export default function Timer(props: Props) {
  return (
      <div>
        {props.name}
        {props.sername}
      </div>
  )
}