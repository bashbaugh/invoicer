import { useTogglData } from "@/hooks/useTogglData";
import Input from "./Input";
import InputGroup from "./InputGroup";

// TODO store more securely

export default function IntegrationSettingsPanel() {
  const [togglToken, setToken] = useTogglData((s) => [
    s.togglToken,
    s.setToken,
  ]);

  return (
    <>
      <p className="mb-4">
        Set your Toggl API key to sync time entries from your Toggl projects
        into your invoice
      </p>
      <InputGroup
        label="Toggl API Token"
        details="You can find your API token at the bottom of your profile settings. Your key is only stored locally, not on our servers, and will expire in 30 days."
      >
        <Input
          defaultValue={togglToken}
          onChange={(e) => setToken(e.target.value)}
          type="password"
          autoComplete="off"
          placeholder="8175fa..."
        />
      </InputGroup>
    </>
  );
}
