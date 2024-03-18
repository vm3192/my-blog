import React, { FC } from "react";
import Button from "@/ui/button";
import { TbLogout2 } from "react-icons/tb";
import { logOut } from "@/lib/actions";

type Props = {};

const LogoutButton: FC<Props> = () => {
  return (
    <form action={logOut}>
      <Button text="LogOut">
        <TbLogout2 />
      </Button>
    </form>
  );
};

export default LogoutButton;
