import { useSearchParams } from "react-router";
import { usePosts } from "../../hook/usePost";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "../tanstackTable/Table";
import Pagination from "../tanstackTable/Pagination";
import { z } from "zod";
import { formatThaiDate } from "../../utils";
import PostRowAction from "./PostRowAction";
import useAuth from "../../hook/useAuth";
export const PostSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  authorId: z.number().min(1),
  createdAt: z.date(),
});
export type PostType = z.infer<typeof PostSchema>;
export const InsertPostSchema = PostSchema.omit({
  id: true,
  authorId: true,
  createdAt: true,
});
export type InsertPostType = z.infer<typeof InsertPostSchema>;

const columns: ColumnDef<PostType>[] = [
  { id: "id", accessorKey: "id", header: "ID" },
  { id: "title", accessorKey: "title", header: "Title" },
  {
    id: "content",
    accessorKey: "content",
    header: "Content",
    cell: (info) => {
      const content = info.getValue() as string;
      return (
        <div>
          {content.length > 30 ? content.substring(0, 30) + "..." : content}
        </div>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => <div>{formatThaiDate(info.getValue() as string)}</div>,
  },
  {
    id: "action",
    header: () => "Action",
    cell: (info) => <PostRowAction row={info.row} />,
  },
];
const PostTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const { user } = useAuth();
  if (!user) return <p>Loading posts...</p>;
  const { data, isLoading, isError } = usePosts(page, limit, user.id);
  const posts = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const updatePage = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error fetching posts.</p>;
  return (
    <div>
      <Table table={table} />
      <Pagination page={page} totalPages={totalPages} updatePage={updatePage} />
    </div>
  );
};

export default PostTable;
