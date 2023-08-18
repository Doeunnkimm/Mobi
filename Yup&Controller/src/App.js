import "./App.css";
import SignUpForm from "./components/onlyYup/sign-up-form";
import SignUpFormWithController from "./components/withController/signUpForm";
function App() {
  return (
    <div>
      {/* <SignUpForm /> */}
      <SignUpFormWithController />
    </div>
  );
}

export default App;
