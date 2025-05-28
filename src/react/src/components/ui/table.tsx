import { type ReactElement, type ReactNode, useMemo, useState } from "react";
import { clsx } from ".";
import { FunnelIcon } from "../icons/funnel";
import { Button } from "./button";
import { ComboBox } from "./combo-box";
import { Flex } from "./flex";
import { Input } from "./input";
import * as table from "./table.css";
import { Heading, Text } from "./text";

interface TableFilter<T> {
  name: string;
  value: (item: T) => TableFilterItem | TableFilterItem[];
  multiple?: boolean;
}

interface TableFilterItem {
  value: string;
  icon?: ReactElement;
}

export function Table<T>({
  title,
  items,
  keyFn,
  render: Render,
  strongFilter,
  filters,
  searchItems,
  orderBy,
  gridClassName,
}: {
  title?: string;
  items: readonly T[] | null;
  keyFn: (item: T) => string;
  render: (props: { item: T }) => ReactNode;
  strongFilter?: (item: T) => boolean;
  filters?: TableFilter<T>[];
  searchItems?: (item: T) => string[];
  orderBy?: (a: T, b: T) => number;
  gridClassName?: string;
}): ReactElement {
  const [enabledFilters, setEnabledFilters] = useState<Record<string, string | null>>({});
  const [search, setSearch] = useState("");

  const searchLower = useMemo(() => search.toLowerCase(), [search]);

  const filterItems = useMemo(() => {
    if (items === null || filters === undefined)
      return null;

    return filters.map((filter) => {
      const uniqueValues = {} as Record<string, TableFilterItem>;

      for (const item of items) {
        const values = filter.value(item);

        for (const value of Array.isArray(values) ? values : [values]) {
          if (uniqueValues[value.value] !== undefined)
            continue;

          uniqueValues[value.value] = value;
        }
      }

      const values = Object.values(uniqueValues);

      return {
        filter,
        values,
      };
    });
  }, [items, filters]);

  const filtered = useMemo(
    () => {
      if (items === null)
        return null;

      return items
        .filter((item) => {
          if (!searchItems)
            return true;

          if (strongFilter && !strongFilter(item))
            return false;

          for (const [key, value] of Object.entries(enabledFilters)) {
            if (value === null)
              continue;

            const filter = filters?.find(f => f.name === key);

            if (filter === undefined)
              continue;

            const values = filter.value(item);
            let found = false;

            for (const v of Array.isArray(values) ? values : [values]) {
              if (v.value === value) {
                found = true;
                break;
              }
            }

            if (!found)
              return false;
          }

          const searches = searchItems(item)
            .map(s => s.toLowerCase());

          return searches.some(s =>
            s.includes(searchLower));
        })
        .toSorted((a, b) => orderBy ? orderBy(a, b) : keyFn(a).localeCompare(keyFn(b)));
    },
    [
      enabledFilters,
      filters,
      items,
      keyFn,
      orderBy,
      searchItems,
      searchLower,
      strongFilter,
    ],
  );

  return (
    <>
      <div className={table.card}>
        <div className={table.header}>
          <Flex items="center" gap="sm">
            {title && (
              <>
                <Text bold>{title}</Text>
                <div />
              </>
            )}

            {
              filterItems !== null && filterItems.map(({ filter, values }) => (
                <ComboBox
                  key={filter.name}
                  title={filter.name}
                  value={[enabledFilters[filter.name] ?? null, (value) => {
                    setEnabledFilters({
                      ...enabledFilters,
                      [filter.name]: value,
                    });
                  }]}
                  options={[null, ...values.map(value => value.value)]}
                  itemKey={t => t ?? "all"}
                  render={({ value }) => (
                    <>
                      {value !== null && values.find(v2 => v2.value === value)?.icon && (
                        <div className={table.logoWrapper}>
                          {values.find(v2 => v2.value === value)?.icon}
                        </div>
                      )}

                      {value ?? "All"}
                    </>
                  )}
                >
                  <Button color="ghost" size="sm">
                    {(enabledFilters[filter.name]
                      && values.find(value => value.value === enabledFilters[filter.name])?.icon
                      && (
                        <div className={table.logoWrapper}>
                          {values.find(value => value.value === enabledFilters[filter.name])?.icon}
                        </div>
                      ))
                      ?? <FunnelIcon />}

                    {filter.name}
                    {": "}
                    {enabledFilters[filter.name] ?? "All"}
                  </Button>
                </ComboBox>
              ))
            }
          </Flex>

          <Flex items="center" gap="sm">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={table.search}
            />
          </Flex>
        </div>

        <div className={table.content}>
          <div className={clsx(table.grid, gridClassName)}>
            {/* {filteredDeals === null && Array.from({ length: 6 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index.toString()} className={earnPageLanding.loadingCard} />
            ))} */}

            {filtered !== null && filtered.map((item) => {
              const key = keyFn(item);

              return (
                <Render key={key} item={item} />
              );
            })}
          </div>

          {filtered !== null && filtered.length === 0 && (
            <div className={table.empty}>
              <Heading level={3}>
                No items found
              </Heading>
            </div>
          )}

          {items === null && (
            <div className={table.empty}>
              <Heading level={3}>
                Loading
              </Heading>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
