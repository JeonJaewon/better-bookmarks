import React from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {
  return (
    <>
      <div>popup</div>
    </>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<Popup />);