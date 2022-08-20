import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Category, Product } from 'models';
import { useState } from 'react';

export interface ProductTableProps {
  productList: Product[];
  categoryMap: {
    [key: string]: Category;
  };
  onEdit?: (product: Product) => void;
  onRemove?: (product: Product) => void;
}
const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}));
export default function ProductTable({
  productList,
  categoryMap,
  onEdit,
  onRemove,
}: ProductTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveClick = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  const handleRemoveConfirm = (product: Product) => {
    // call remove
    onRemove?.(product);
    // hide dialog
    setOpen(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên Sản phẩm</TableCell>
              <TableCell>Giá sản phẩm</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Mô tả sản phẩm</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((product) => (
              <TableRow key={product.id}>
                <TableCell width={100}>{product.id}</TableCell>
                <TableCell width={200}>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <img src={product.picture.name} alt={product.name} width={200} height={200} />
                </TableCell>
                <TableCell width={600}>{product.desc}</TableCell>
                <TableCell>{product.danhmuc.title}</TableCell>
                <TableCell align="right">
                  <Button
                    className={classes.edit}
                    size="small"
                    color="primary"
                    onClick={() => onEdit?.(product)}
                  >
                    Edit
                  </Button>

                  <Button size="small" color="secondary" onClick={() => handleRemoveClick(product)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xóa sản phẩm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn muốn xóa sản phẩm "{selectedProduct?.name}"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="outlined">
            Hủy
          </Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedProduct as Product)}
            autoFocus
            color="secondary"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
