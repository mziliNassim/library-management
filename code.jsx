setLoading(true);
filteredBooks = books.filter((book) => {
  const matchesSearch = book.titre
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory = categoryFilter
    ? book.categorie === categoryFilter
    : true;

  const matchesLangue = langueFilter ? book.langue === langueFilter : true;

  const matchesDisponible =
    disponibleFilter === "" ||
    (disponibleFilter === "available" && book.quantite > 0) ||
    (disponibleFilter === "notAvailable" && book.quantite === 0);

  return matchesSearch && matchesCategory && matchesLangue && matchesDisponible;
});
setLoading(false);
