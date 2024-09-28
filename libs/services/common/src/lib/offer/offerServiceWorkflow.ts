import { injectable } from "inversify";
import { OfferService } from "./offer.service";

@injectable()
export class OfferServiceWorkflow implements OfferService {
  async getOffers() {
    return [
      {
        name: "Classic", availableItems: [
          "66e99aa6051e4afd90ed2093", "66e99aa6051e4afd90ed2096", "66e99aa6051e4afd90ed2099",
          "66e99aa6051e4afd90ed209c", "66e99aa5051e4afd90ed205d",
          "66e99aa6051e4afd90ed206f", "66e99aa6051e4afd90ed2072",
          "66e99aa6051e4afd90ed207e", "66e99aa6051e4afd90ed2081", "66e99aa6051e4afd90ed2084"
        ]
      },
      {
        name: "Cousinhood", availableItems: [
          "66e99aa6051e4afd90ed209f", "66e99aa6051e4afd90ed20a2", "66e99aa6051e4afd90ed20a5", "66e99aa6051e4afd90ed20b1",
          "66e99aa6051e4afd90ed2063", "66e99aa6051e4afd90ed2066",
          "66e99aa6051e4afd90ed2075", "66e99aa6051e4afd90ed2078",
          "66e99aa6051e4afd90ed2087", "66e99aa6051e4afd90ed208a"

        ]
      },
      {
        name: "Company", availableItems: [
          "66e99aa6051e4afd90ed20a8", "66e99aa6051e4afd90ed20ab", "66e99aa6051e4afd90ed20ae", "66e99aa6051e4afd90ed20b4",
          "66e99aa6051e4afd90ed2069", "66e99aa6051e4afd90ed206c", "66e99aa6051e4afd90ed2066",
          "66e99aa6051e4afd90ed2072", "66e99aa6051e4afd90ed2075", "66e99aa6051e4afd90ed2078",
          "66e99aa6051e4afd90ed207e", "66e99aa6051e4afd90ed2081", "66e99aa6051e4afd90ed2084"
        ]
      }
    ];
  }
}
