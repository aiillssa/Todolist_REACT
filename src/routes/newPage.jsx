import pic from "../pic.jpg";
import "../App.css";

export function NewPage() {
  return (
    <div>
      <img src={pic} className="logo"></img>
      <p> You've been AIDANED</p>
    </div>
  );
}
