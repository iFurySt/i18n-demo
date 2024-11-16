'use client';

import React from 'react';
import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from '@nextui-org/react';
import {SearchIcon} from '@nextui-org/shared-icons';
import {useLocale, useTranslations} from 'next-intl';
import {setUserLocale} from "@/i18n/locale";

const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

const columns = [
  {name: 'ID', uid: 'id', sortable: true},
  {name: 'NAME', uid: 'name', sortable: true},
  {name: 'AGE', uid: 'age', sortable: true},
  {name: 'ROLE', uid: 'role', sortable: true},
  {name: 'TEAM', uid: 'team'},
  {name: 'EMAIL', uid: 'email'},
  {name: 'STATUS', uid: 'status', sortable: true},
  {name: 'ACTIONS', uid: 'actions'},
];

const list = [
  {
    id: 1,
    name: 'Tony Reichert',
    role: 'CEO',
    team: 'Management',
    status: 'Active',
    age: '29',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    email: 'tony.reichert@example.com',
  },
  {
    id: 2,
    name: 'Zoey Lang',
    role: 'Tech Lead',
    team: 'Development',
    status: 'Inactive',
    age: '25',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    email: 'zoey.lang@example.com',
  },
  {
    id: 3,
    name: 'Jane Fisher',
    role: 'Sr. Dev',
    team: 'Development',
    status: 'Active',
    age: '22',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    email: 'jane.fisher@example.com',
  }
];

type UserType = (typeof list)[0];

const TablePage = () => {
  const lang = useLocale();
  const t = useTranslations();

  const renderCell = React.useCallback(
    (user: UserType, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof UserType];

      switch (columnKey) {
        case 'name':
          return (
            <User
              avatarProps={{radius: 'lg', src: user.avatar}}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case 'role':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {user.team}
              </p>
            </div>
          );
        case 'status':
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
            >
              {t(cellValue)}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <SearchIcon className="text-default-300"/>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div>
          Text in the table top content: {t('HomePage')}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {list.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    list.length,
    lang
  ]);

  return (
    <div className="flex flex-col p-10 gap-5">
      <div>
        Current language: {lang}
      </div>
      <Button color="primary" onClick={async () => {
        if (lang === 'en') {
          await setUserLocale('zh');
        } else {
          await setUserLocale('en');
        }
      }}>
        Switch Language
      </Button>
      <div>
        Text outside the table: {t('HomePage')}
      </div>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        classNames={{
          wrapper: 'max-h-[382px]',
        }}
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No users found" items={list}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablePage;
