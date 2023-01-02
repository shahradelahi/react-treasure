# React Treasure

React Treasure is a tool that allows you to share and store data across React components. It uses the `React Context` API to manage data.

### Installation

```bash
npm install react-treasure
```

### Usage

Before you can use the `Treasure` you need to wrap your application/parent component with the `TreasureProvider`.

```jsx
import { Provider } from "react-treasure";

const defaultUser = {
   name: "John Doe",
   age: 20
};

function App() {
   return (
       <Provider initialData={{user: defaultUser}}>
          <User />
       </Provider>
   );
}
```

Here let's say we have a `User` component that has a `UserDetails` component as a child. We want to share the user data across both components.

```jsx
import React from "react";
import { useTreasure } from "react-treasure";

const User = () => {
   const [ userData ] = useTreasure("user");

   return (
       <div>
          <h1>{user.name}</h1>
          <UserDetails />
       </div>
   );
};
```

In the `UserDetails` component we want to access the user data and modify it.

```jsx
import React from "react";
import { useTreasure } from "react-treasure";

const UserDetails = () => {
   const [ user, setUser ] = useTreasure("user");

   return (
      <div>
         <button onClick={() => setUser({ name: "Jeff Bezos", age: 55 })}>
            Change User
         </button>
      </div>
   );
};
```

### License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
