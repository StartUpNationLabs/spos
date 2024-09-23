import { useOffers } from "../../offers/stores/offers";
import { useGroups } from "./groups"


export const useOffersByGroupId = (groupId : string) => {
  const groups = useGroups();
  const offers = useOffers();

  const selectedGroup = groups.groups.find(group => group.groupId === groupId);

  if (selectedGroup === undefined) {
    return undefined;
  }

  return offers.offers.find(offer => selectedGroup.offer.toLowerCase() === offer.name.toLowerCase());
}
