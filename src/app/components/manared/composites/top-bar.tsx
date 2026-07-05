import { HStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";

import { MaNaReDIcon } from "../icons/manared-icon";
import { SearchBar } from "./search-bar";

const utilityLinks = ["Tools", "Resources", "Help"] as const;

/** Top application bar from Figma `MaNaReD/component/top-bar/empty`. */
export function TopBar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-emphasized bg-surface px-4">
      <MaNaReDIcon name="logo" size={32} label="MaNaReD logo" />
      <SearchBar />
      <HStack gap={6} vAlign="center" className="ml-auto shrink-0">
        {utilityLinks.map((link) => (
          <Text
            key={link}
            size="2xs"
            color="secondary"
            className="cursor-pointer hover:text-primary"
          >
            {link}
          </Text>
        ))}
        <MaNaReDIcon name="profile" size={32} label="Profile" />
      </HStack>
    </header>
  );
}
