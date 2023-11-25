import BaseTable from "@mui/material/Table";
import BaseTableBody from "@mui/material/TableBody";
import BaseTableCell from "@mui/material/TableCell";
import BaseTableContainer from "@mui/material/TableContainer";
import BaseTableHead from "@mui/material/TableHead";
import BaseTableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type BaseDataType = {
  id: string;
};
type Props<TData extends BaseDataType> = {
  data: TData[];
  columns: {
    title: string;
    render: (data: TData) => React.ReactNode;
  }[];
};
export default function Table<TData extends BaseDataType>(props: Props<TData>) {
  const { data, columns } = props;
  return (
    <BaseTableContainer component={Paper}>
      <BaseTable sx={{ minWidth: 650 }} aria-label="simple table">
        <BaseTableHead>
          <BaseTableRow>
            {columns.map((column) => (
              <BaseTableCell key={column.title}>{column.title}</BaseTableCell>
            ))}
          </BaseTableRow>
        </BaseTableHead>
        <BaseTableBody>
          {data.map((row) => (
            <BaseTableRow key={row.id}>
              {columns.map((column) => (
                <BaseTableCell key={column.title}>
                  {column.render(row)}
                </BaseTableCell>
              ))}
            </BaseTableRow>
          ))}
        </BaseTableBody>
      </BaseTable>
    </BaseTableContainer>
  );
}
