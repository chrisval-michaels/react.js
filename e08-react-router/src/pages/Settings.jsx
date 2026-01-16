function Settings() {
  return (
    <div className="page">
      <h1>Application Settings</h1>
      <p>Customize the app experience to your liking.</p>

      <div className="card">
        <h3>Theme</h3>
        <button className="btn">Switch to Dark Mode</button>
      </div>

      <div className="card">
        <h3>Language</h3>
        <select className="btn">
          <option>English</option>
          <option>Finnish</option>
        </select>
      </div>
    </div>
  );
}

export default Settings;
