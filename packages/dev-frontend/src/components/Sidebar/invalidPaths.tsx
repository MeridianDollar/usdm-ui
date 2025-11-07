interface InvalidPath {
    network: number;
    path: string;
  }
  
  const invalidPaths: InvalidPath[] = [
    { network: 8453, path: "https://lend.meridianfinance.net/" },
  ];
  
  export function isInvalidPath(network: number, path: string): boolean {
    const isInvalid = invalidPaths.some((invalidPath) => {
      return invalidPath.network === network && invalidPath.path === path;
    });
  
    if (isInvalid) {
      window.alert("Please switch network.\nLending is currently only available on Telos, Fuse & Meter and  networks.");
    }
  
    return isInvalid;
  }