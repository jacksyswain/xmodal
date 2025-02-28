import './App.css';

import  {
  Fragment,
  useRef,
  useState,
} from 'react';

const App = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const insideModal = useRef(null);

  // Close modal if clicked outside
  const handleClose = (e) => {
    if (insideModal.current && !insideModal.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // Validation function
  const handleValidation = () => {
    if (form.phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    const currentDate = new Date(form.dob);

    //If currentDate return other than number will comes in NaN
    if(isNaN(currentDate)){
        alert("Invalid date of birth. Please enter a valid date.")
        return false;
    }
    else if (currentDate > new Date()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      return false;
    }
    return true;
  };

  //HandleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      return;
    }

    setForm({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });

    setOpen(false);
  };

  // Handle all form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Fragment>
      <h1>User Details Modal</h1>
      <button onClick={() => setOpen(true)}>Open Form</button>

      {open && (
        <div className="modal" onClick={handleClose}>
          <div className="modal-content" ref={insideModal}>
            <h4>Fill Details</h4>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">UserName</label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="number"
                name="phone"
                id="phone"
                value={form.phone}
                onChange={handleChange}
              />
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={form.dob}
                onChange={handleChange}
              />
              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default App;