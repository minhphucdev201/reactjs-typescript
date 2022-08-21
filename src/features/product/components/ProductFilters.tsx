import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { Category, ListParams } from 'models';
import { ChangeEvent } from 'react';

export interface ProductFiltersProps {
  filter: ListParams;
  categoryList: Category[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function ProductFilters({
  filter,
  categoryList,
  onChange,
  onSearchChange,
}: ProductFiltersProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter,
      name_containss: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };
  const handleCategoryChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      danhmuc_eq: e.target.value || undefined,
      _page: 1,
    };
    onChange(newFilter);
  };
  // const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
  //   if (!onChange) return;
  //   const value = e.target.value;
  //   const [_sort] = (value as string) ? 'ASC' : 'DESC';
  //   const newFilter: ListParams = {
  //     ...filter,
  //     _sort: (_sort as '_sort:ASC') || '_sort:DESC' || undefined,
  //   };
  //   console.log(newFilter);
  //   onChange(newFilter);
  // };
  return (
    <Box>
      <Grid container spacing={3}>
        {/* Search product name */}
        <Grid item xs={12} md={6} lg={4} sm={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search By Name</InputLabel>
            <OutlinedInput id="searchByName" label="Search By Name" onChange={handleSearchChange} />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCategory">Filter By Category</InputLabel>
            <Select
              labelId="filterByCategory"
              value={filter.category}
              onChange={handleCategoryChange}
              label="Filter By Category"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {categoryList.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/*  filter by sort  */}
        {/* <Grid item xs={12} md={6} lg={2}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="sortBy">Sort By </InputLabel>
            <Select
              labelId="sortBy"
              // label="Sort By "
              value={filter._sort ? `${filter._sort}.${}` : ''}
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>Giá</em>
              </MenuItem>
              <MenuItem value="price:ASC">Giá: Giá thấp đến cao</MenuItem>
              <MenuItem value="price:DESC">Giá: Giá cao đến thấp</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
      </Grid>
    </Box>
  );
}
