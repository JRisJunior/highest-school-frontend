import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { Calendar } from "./Calendar";

function App() {
  return (
    <div>
      <Header />
      <Signup />
      <Login />
      <LogoutLink />
      <Calendar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;