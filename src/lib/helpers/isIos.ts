export function isIOS() {
  const { userAgent } = navigator;

  return (
    (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) ||
    userAgent.includes("Mac")
  );
}
