import {
  Action,
  ActionPanel,
  Alert,
  confirmAlert,
  Form,
  Icon,
  openExtensionPreferences,
  popToRoot,
  showToast,
  Toast,
} from "@raycast/api";
import { useEffect, useState } from "react";
import { formatClock, getState, hasMenuBarBeenSeen, startTimer, TimerState } from "./timer";

interface FormValues {
  hours: string;
  minutes: string;
  breakMinutes: string;
}

export default function StartTimer() {
  const [existing, setExisting] = useState<TimerState | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getState()
      .then((state) => {
        setExisting(state);
      })
      .catch(() => {
        void showToast({
          style: Toast.Style.Failure,
          title: "Failed to load timer state",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  async function handleSubmit(values: FormValues) {
    const hours = Number(values.hours) || 0;
    const minutes = Number(values.minutes) || 0;
    const breakMinutes = Number(values.breakMinutes) || 0;
    const totalMinutes = hours * 60 + minutes;

    if (totalMinutes <= 0) {
      await showToast({ style: Toast.Style.Failure, title: "Enter a working time greater than 0" });
      return;
    }

    if (existing?.running) {
      const confirmed = await confirmAlert({
        title: "Replace running timer?",
        message: "A timer is already running. Starting a new one will replace it.",
        primaryAction: { title: "Replace", style: Alert.ActionStyle.Destructive },
      });
      if (!confirmed) return;
    }

    const state = await startTimer(totalMinutes, breakMinutes);

    if (await hasMenuBarBeenSeen()) {
      await showToast({
        style: Toast.Style.Success,
        title: "Timer started",
        message: `Ends around ${formatClock(state.endTime)}`,
      });
    } else {
      // The menu-bar command has never run, so it's very likely not enabled yet and the
      // countdown won't be visible anywhere. Block with an alert instead of a toast that
      // could be missed or auto-dismiss before the user notices.
      await confirmAlert({
        title: "Enable the Menu Bar to See Your Timer",
        message: `Timer started, ends around ${formatClock(state.endTime)}. Enable "Work Timer" in your menu bar to see the countdown.`,
        primaryAction: {
          title: "Open Extension Preferences",
          onAction: () => openExtensionPreferences(),
        },
        dismissAction: { title: "OK" },
      });
    }
    await popToRoot();
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Start Timer" icon={Icon.Play} onSubmit={handleSubmit} />
          <Action
            title="Enable Menu Bar…"
            icon={Icon.Gear}
            shortcut={{ modifiers: ["cmd"], key: "," }}
            onAction={() => openExtensionPreferences()}
          />
        </ActionPanel>
      }
    >
      <Form.Description
        title="Punch Clock"
        text="Enter how long you want to work today and how long your break will be. The countdown (work time + break) will then run in the menu bar."
      />
      <Form.TextField id="hours" title="Working Hours" placeholder="8" defaultValue="8" />
      <Form.TextField id="minutes" title="Working Minutes" placeholder="0" defaultValue="0" />
      <Form.Separator />
      <Form.TextField id="breakMinutes" title="Break (minutes)" placeholder="30" defaultValue="30" />
    </Form>
  );
}
