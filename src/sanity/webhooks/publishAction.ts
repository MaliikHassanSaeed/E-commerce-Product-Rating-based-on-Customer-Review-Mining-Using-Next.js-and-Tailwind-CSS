import axios from "axios";

export function createImprovedAction(originalPublishAction: any) {
  const BetterAction = (props: any) => {
    const originalResult = originalPublishAction(props);
    return {
      ...originalResult,
      onHandle: () => {
        originalResult.onHandle();
      },
    };
  };
  return BetterAction;
}
