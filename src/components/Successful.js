import * as React from "react";


export function Successful() {
  let order_no = 1256;
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h4>
        Your order, #{order_no} is now being placed and will be delivered soon
      </h4>
    </div>
  );
}
