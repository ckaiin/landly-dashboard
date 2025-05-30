export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Welcome to Landly 🏡</h1>
      <p>This is your landlord AI dashboard MVP.</p>
      <ul>
        <li>➡️ Add properties</li>
        <li>➡️ Add tenants</li>
        <li>➡️ Generate leases (GPT-powered)</li>
        <li>➡️ Send rent reminders (SMS/email)</li>
      </ul>
    </div>
  );
}