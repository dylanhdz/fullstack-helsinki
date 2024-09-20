const Header = ({course}) => {
    return (
      <h2>{course}</h2>
    )
  }
  const Part = ({name, exercises}) => {
    return (
      <p>{name} {exercises}</p>
    )
  }
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      </>
    )
  }
  const Total = ({parts}) => {
    // Without reduce
    //let total = 0
    //for (let i = 0; i < parts.length; i++) {
    //    const part = parts[i].exercises;
    //    total = total + part; 
    //}
    //const numExercises = parts.map(part => part.exercises)
    return (
        //<p>Number of exercises {parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises}</p>
        <p><b>Total of exercises {parts.reduce((a,b) => a+b.exercises, 0)}</b></p>
    )
  }

  const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
  }

  export default Course