import useBreadcrumb from "../../common/hooks/breadcrumbs";

const ProductAddEdit: React.FC = () => {
    /**
     * set the breadcrumbs of the current page
     * @author Amr
     */
    useBreadcrumb([
        {
            label: 'Projects',
            path: "/projects"
        },
        {
            label: 'Create',
            path: "/projects/create",
            isCurrent:true
        }
    ])
    return (
        <>
              <span>
            create a new Product
        </span>
        </>

    );
}

export default ProductAddEdit;