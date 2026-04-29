/**
 * Shared Mongo-style filter + sort for listing pages (category / shop collection).
 */
export function parseListingQuery(searchParams) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const sort = typeof searchParams?.sort === "string" ? searchParams.sort : "new";
  const minRaw = searchParams?.minPrice;
  const maxRaw = searchParams?.maxPrice;
  const minPrice = minRaw !== undefined && minRaw !== "" ? Number(minRaw) : null;
  const maxPrice = maxRaw !== undefined && maxRaw !== "" ? Number(maxRaw) : null;
  const discountsOnly = searchParams?.discounts === "1";

  return {
    q,
    sort,
    minPrice: Number.isFinite(minPrice) ? minPrice : null,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : null,
    discountsOnly,
  };
}

export function buildProductListingFilter(baseFilter, listing) {
  const filter = { ...baseFilter };

  if (listing.q) {
    const qClause = { name: { $regex: listing.q, $options: "i" } };
    if (filter.name) {
      filter.$and = [{ name: filter.name }, qClause];
      delete filter.name;
    } else {
      Object.assign(filter, qClause);
    }
  }

  const clauses = [];

  if (listing.minPrice != null || listing.maxPrice != null) {
    const priceRange = {};
    if (listing.minPrice != null) priceRange.$gte = listing.minPrice;
    if (listing.maxPrice != null) priceRange.$lte = listing.maxPrice;
    clauses.push({ price: priceRange });
  }

  if (listing.discountsOnly || listing.sort === "discounts") {
    clauses.push({
      $expr: {
        $and: [
          { $gt: [{ $ifNull: ["$compareAtPrice", 0] }, 0] },
          { $gt: [{ $ifNull: ["$compareAtPrice", 0] }, "$price"] },
        ],
      },
    });
  }

  if (clauses.length) {
    if (filter.$and) {
      filter.$and = [...filter.$and, ...clauses];
    } else if (clauses.length === 1) {
      Object.assign(filter, clauses[0]);
    } else {
      filter.$and = clauses;
    }
  }

  let sort = { createdAt: -1 };
  switch (listing.sort) {
    case "trending":
      sort = { featured: -1, createdAt: -1 };
      break;
    case "new":
      sort = { createdAt: -1 };
      break;
    case "high_price":
      sort = { price: -1 };
      break;
    case "low_price":
      sort = { price: 1 };
      break;
    case "discounts":
      sort = { createdAt: -1 };
      break;
    default:
      sort = { createdAt: -1 };
  }

  return { filter, sort };
}
