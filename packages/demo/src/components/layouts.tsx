import { ReactNode } from "react";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import { User } from "@/.generate/gql";

export default function Layout({
  children,
  currentUser,
}: {
  children: ReactNode;
  currentUser?: User;
}) {
  const router = useRouter();
  return (
    <>
      <AppBar position="static">
        <Stack direction={"row"} justifyContent="space-between">
          <Toolbar>
            <Typography variant="h6" component="div">
              Demo APP
            </Typography>
            <Stack direction={"row"} spacing={2} ml={4}>
              <Button color="inherit" onClick={() => router.push("/notes")}>
                Notes
              </Button>
            </Stack>
          </Toolbar>
          {currentUser && (
            <Toolbar>
              <Avatar>{currentUser.name.toUpperCase()[0]}</Avatar>
            </Toolbar>
          )}
        </Stack>
      </AppBar>
      <Container maxWidth="xl" sx={{ p: 2 }}>
        {children}
      </Container>
    </>
  );
}
