import StorylineData from "../resources/storyline-type"

export type pointerType = {
  scene: string
  "scene-number": number;
  "ref-current": string;
}

export const start = (storyline: StorylineData) => {
    const scene = storyline[0].name;
    const sceneContent = storyline[0].content;
    const firstEntry = Object.entries(sceneContent)
        .sort(([, a], [, b]) => a.order - b.order)[0];
    const currentRef = firstEntry ? firstEntry[0] : "broken";
    if (firstEntry && firstEntry[1].require) {
        console.log("There is a required party member.") // Fix to if the party member is not there then move to the next entry.
    }
    return {
        "scene": scene,
        "scene-number": 0,
        "ref-current": currentRef
    }
}

export function findRef(pointers: pointerType, ref: string, storyline: StorylineData) {
  const sceneContent = storyline[pointers["scene-number"]].content;
  if (sceneContent[ref]) {
    pointers["ref-current"] = ref;
  } else {
    pointers["ref-current"] = "broken";
  }
}

/**
interface User {
  id: number;
  name: string;
  age: number;
}

const jsonString = `[
  { "id": 1, "name": "Alice", "age": 20 },
  { "id": 2, "name": "John", "age": 30 },
  { "id": 3, "name": "David", "age": 25 }
]`;

const users: User[] = JSON.parse(jsonString);

// Find a single user by id
const userById = users.find(user => user.id === 2);
console.log(userById); // Output: { id: 2, name: 'John', age: 30 }

// Find all users older than a certain age
const usersOlderThan = users.filter(user => user.age > 25);
console.log(usersOlderThan); // Output: [ { id: 2, name: 'John', age: 30 } ]

 */