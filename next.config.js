const uniqueCategories = Array.from(
  new Set(
    result.data
      .map((item: MediaItem) => item.category)
      .filter((c): c is string => Boolean(c))
  )
) as string[]

setMediaCategories(uniqueCategories)
