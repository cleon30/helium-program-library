import { ataResolver, combineResolvers } from "@helium/spl-utils";
import { heliumSubDaosResolvers } from "@helium/helium-sub-daos-sdk";
import { resolveIndividual } from "@helium/spl-utils";
import { AnchorProvider } from "@project-serum/anchor";
import { circuitBreakerResolvers } from "@helium/circuit-breaker-sdk";

export const dataCreditsResolvers = combineResolvers(
  heliumSubDaosResolvers,
  circuitBreakerResolvers,
  ataResolver({
    instruction: "mintDataCreditsV0",
    account: "recipientTokenAccount",
    mint: "dcMint",
    owner: "recipient",
  }),
  ataResolver({
    instruction: "mintDataCreditsV0",
    account: "burner",
    mint: "hntMint",
    owner: "owner",
  }),
  ataResolver({
    instruction: "delegateDataCreditsV0",
    account: "fromAccount",
    mint: "dcMint",
    owner: "owner",
  }),
  ataResolver({
    instruction: "mintDataCreditsV0",
    account: "recipientTokenAccount",
    mint: "dcMint",
    owner: "recipient",
  }),
  resolveIndividual(async ({ path, accounts, provider }) => {
    if (path[path.length - 1] === "recipient" && !accounts.recipient && (provider as AnchorProvider).wallet) {
      return (provider as AnchorProvider).wallet.publicKey;
    }
  })
);
