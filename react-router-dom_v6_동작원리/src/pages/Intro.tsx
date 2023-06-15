export interface IntroProp {
  name: string
  age: number
}

const Intro = ({ name, age }: IntroProp) => {
  return (
    <h1>
      Name: {name}, age: {age}
    </h1>
  )
}
export default Intro
