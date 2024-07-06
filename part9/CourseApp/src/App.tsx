interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface CoursePartsProps {
  parts: CoursePart[];
}

interface CourseName {
  name: string;
}

const Header = (props: CourseName) => {
  return <h1>{props.name}</h1>;
};

const Content = (props: CoursePartsProps) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <p key={index}>
          <Part {...part} />
        </p>
      ))}
    </div>
  );
};

const Total = (props: CoursePartsProps) => {
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return <p>Number of exercises {totalExercises}</p>;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePart) => {
        switch(props.kind){
          case "basic":
            return (
              <div>
                <h3>{props.name} {props.exerciseCount}</h3>
                <p>{props.description}</p>
              </div>
            );
          case "group":
            return (
              <div>
                <h3>{props.name} {props.exerciseCount}</h3>
                <p>{props.groupProjectCount}</p>
              </div>
            );
          case "background":
            return (
              <div>
                <h3>{props.name} {props.exerciseCount}</h3>
                <p>{props.description}</p>
                <p>{props.backgroundMaterial}</p>
              </div>
            );
          case "special":
            return (
              <div>
                <h3>{props.name} {props.exerciseCount}</h3>
                <p>{props.description}</p>
                <ul>
                  {props.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            );
            default:
            return assertNever(props);
        }
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },{
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;