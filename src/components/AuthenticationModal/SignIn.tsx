import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";

function SignIn({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <DialogTitle>SignIn</DialogTitle>
    </div>
  );
}

export default SignIn;
