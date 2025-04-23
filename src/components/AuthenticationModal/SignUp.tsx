import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";

function SignUp({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <DialogTitle>SignUp</DialogTitle>
    </div>
  );
}

export default SignUp;
