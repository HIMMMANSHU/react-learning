import { useState } from "react";                       
function Counter() {

    const [count, setCount] = useState(0);
    return (
      <div>
        <div className="button" onClick={() => setCount(count + 1)}>
          Click me
        </div>
        <h2>{count}</h2>
      </div>
    );
  }
  export default Counter;