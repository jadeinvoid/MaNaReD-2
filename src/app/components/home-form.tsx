"use client";

import { useState } from "react";
import { Button } from "@astryxdesign/core/Button";
import { VStack } from "@astryxdesign/core/Layout";
import { TextInput } from "@astryxdesign/core/TextInput";

/** Client island: controlled Astryx inputs need React state. */
export function HomeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <VStack gap={3}>
      <TextInput label="Name" placeholder="Ada Lovelace" value={name} onChange={setName} />
      <TextInput label="Email" placeholder="ada@example.com" value={email} onChange={setEmail} />
      <Button
        label="Submit"
        variant="primary"
        onClick={() => {
          // Demo only — wire to a server function when you need real submit.
        }}
      />
    </VStack>
  );
}
