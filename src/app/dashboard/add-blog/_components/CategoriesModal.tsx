/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import BlogCategoriesType, {
  IBlogCategoriesSchemaType,
} from '@/schemas/BlogCategories';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import Notice, { NoticeProps } from '@/components/common/Notice';
import { SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { PropertyStatus } from '@/types';
import api from '@/lib/api';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogCategories } from '@/redux/blogFeatures/blogs-slice';
import toast from 'react-hot-toast';

const CategoriesModal = () => {
  const dispatch = useDispatch();
  const blogCategories = useSelector(
    (state: any) => state.blogReducer.blogCategories
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>();
  const [notice, setNotice] = React.useState<NoticeProps>();

  useEffect(() => {
    dispatch(getBlogCategories({}) as any);
  }, [loading, id]);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IBlogCategoriesSchemaType>({
    defaultValues: {
      category: '',
      status: '',
    },
    resolver: zodResolver(BlogCategoriesType),
  });

  const handleChange = (option: { label: string; value: any }) => {
    setValue('status', option.value);
  };

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      boxShadow: '0 0 0 0 #fff',
      padding: '0.5rem 0.5rem',
    }),
    option: (styles: any, { isFocused, isSelected, isHovered }: any) => {
      let backgroundColor = '';
      const margin = '5px auto';
      const width = '96%';
      const borderRadius = '3px';

      if (isSelected) {
        backgroundColor = '#509f97';
      } else if (isHovered) {
        backgroundColor = '#509f9712';
      } else if (isFocused) {
        backgroundColor = '#509f9712';
      }

      return {
        ...styles,
        backgroundColor,
        margin,
        width,
        borderRadius,
      };
    },
  };

  const onSubmit: SubmitHandler<IBlogCategoriesSchemaType> = async (data) => {
    try {
      setNotice(() => ({
        type: 'info',
        message: 'Saving...',
      }));
      const url = api.addBlogCategoriesApi;
      setLoading(true);
      const result = await api.post(url, JSON.stringify(data));
      if (!result?.ok) {
        setNotice(() => ({
          type: 'danger',
          message: result?.message || 'Something went wrong',
        }));
      } else {
        setNotice(() => ({
          type: 'success',
          message: result?.message || 'Successfully Uploaded',
        }));
        reset({
          category: '',
          status: '',
        });
      }
    } catch (error: any) {
      setNotice(() => ({
        type: 'danger',
        message: error?.message || 'Something went wrong',
      }));
      //
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (category: any) => {
    try {
      const url = `${api.deleteBlogCategoriesApi}/${category?._id}`;
      const isConfirm = confirm(
        `Are you sure, you want to delete ${category?.category} category`
      );
      if (isConfirm) {
        setId(category?._id);
        const result = await api.del(url);
        if (!result?.ok) {
          toast.error(result?.message);
        } else {
          toast.success(result?.message);
        }
      }
    } catch (error) {
      //
    } finally {
      setId('');
    }
  };

  return (
    <div className="modal-dialog modal-dialog-centered modal-md">
      <style jsx>
        {`
          .nav-link[aria-selected='true'] {
            color: #509f97;
          }
          .nav-link[aria-selected='false'] {
            color: #000;
          }
        `}
      </style>
      <div className="modal-content">
        <div className="row justify-content-between align-items-start px-5 pt-3">
          <div className="nav nav-tabs col-sm-10" id="myTab" role="tablist">
            <button
              className={`nav-link active`}
              id="nav-tenants-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-tenants"
              role="tab"
              aria-controls="tenants"
              aria-selected="true"
            >
              Add New Categories
            </button>
          </div>
          <button
            data-bs-dismiss="modal"
            aria-label="Close"
            className="btn-close col-sm-2"
          ></button>
        </div>
        <div
          style={{ padding: '0rem 2.5rem' }}
          className="tab-content"
          id="nav-tabContent"
        >
          {notice && (
            <div className="mt-2 mb-0">
              <Notice type={notice.type} message={notice.message} />
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb10 mt-1">
              <label className="fw-bold mb-1 lead">
                <small>Category Name</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Category"
                {...register('category', {
                  onChange: (e) => {
                    const value = e.target.value.toLowerCase().trim();
                    if (value) {
                      const changeValue = `${value
                        .charAt(0)
                        .toUpperCase()}${value.slice(1).toLowerCase()}`;
                      setValue('category', changeValue);
                    }
                  },
                })}
              />
              {errors.category && (
                <p className="fz13 pl10 text validation-error">
                  {errors.category?.message}
                </p>
              )}
            </div>
            <label className="fw-bold mb-1 lead">
              <small>Status</small>
            </label>
            <Select
              styles={customStyles}
              className="mb20"
              classNamePrefix="select"
              onChange={(selectedOption: any) => {
                handleChange(selectedOption);
              }}
              value={
                watch('status') && {
                  label: watch('status').toUpperCase(),
                }
              }
              options={Object.keys(PropertyStatus)
                .map((x: string) => ({
                  label: x,
                  value: (PropertyStatus as any)[x],
                }))
                .filter((x: any) => x.value === 'published')}
            />
            {errors.status && (
              <p className="fz13 pl10 text validation-error">
                {errors.status?.message}
              </p>
            )}
            <button
              type="submit"
              style={{ height: '2.5rem' }}
              className="w-100 ud-btn btn-thm position-relative py-0 mb-3 rounded-2"
            >
              {loading ? (
                <div className="position-absolute start-0 top-0 h-100 w-100 d-flex align-items-center justify-content-center">
                  <div
                    style={{ width: '20px', height: '20px' }}
                    className="spinner-border text-white bg-transparent"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                'Add Now'
              )}
            </button>
            {blogCategories?.data?.length > 0 && (
              <div className="table-responsive col-12 my-3">
                <p className="lead px-2">All Categories</p>
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Sr.no</th>
                      <th scope="col" className="text-nowrap">
                        Name
                      </th>
                      <th scope="col">Status</th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{ height: '2.5rem' }}
                    className="position-relative py-0 w-100"
                  >
                    <>
                      {blogCategories?.data?.map((x: any, i: number) => (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td className="text-nowrap">{x.category}</td>
                          <td className="text-nowrap">{x.status}</td>
                          <td
                            onClick={() => handleDelete(x)}
                            className="text-nowrap text-center pointer text-danger"
                          >
                            {id === x?._id ? (
                              <i className="fa-duotone fa-spinner-third fa-spin"></i>
                            ) : (
                              <i
                                style={{ transform: 'scale(1.25)' }}
                                className="fa-solid fa-trash"
                              ></i>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  </tbody>
                </table>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;
