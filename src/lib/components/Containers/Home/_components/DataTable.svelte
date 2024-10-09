<script lang="ts">
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import { addHiddenColumns, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import moment from 'moment';

	import { readable } from 'svelte/store';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { cn } from '$lib/utils.js';
	import { Input } from '$lib/components/ui/input/index.js';

	import Actions from './DataTableActions.svelte';

	export let pasien: App.Pasien[] | undefined = [];

	const table = createTable(readable(pasien), {
		sort: addSortBy({ disableMultiSort: true }),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
		table.column({
			header: 'Nama',
			accessor: 'nama',
			plugins: {
				filter: {
					getFilterValue(value) {
						return value.toLowerCase();
					}
				}
			}
		}),
		table.column({
			header: 'Rekam Medis',
			accessor: 'rekam_medis',
			cell: ({ value }) => value.toLowerCase(),
			plugins: {
				filter: {
					getFilterValue(value) {
						return value.toLowerCase();
					}
				}
			}
		}),
		table.column({
			header: 'KTP',
			accessor: 'ktp',
			cell: ({ value }) => value.toLowerCase(),
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					getFilterValue(value) {
						return value.toLowerCase();
					}
				}
			}
		}),
		table.column({
			header: 'Tanggal Lahir',
			accessor: 'tgl_lahir',
			cell: ({ value }) => moment(value).format('YYYY-MM-DD'),
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					getFilterValue(value) {
						return value.toLowerCase();
					}
				}
			}
		}),
		table.column({
			header: 'Jenis Kelamin',
			accessor: 'jk',
			plugins: {
				filter: {
					getFilterValue(value) {
						return value.toLowerCase();
					}
				}
			}
		}),
		table.column({
			header: 'Pendidikan',
			accessor: 'pendidikan',
			plugins: {
				filter: {
					getFilterValue(value) {
						return value.toLowerCase();
					}
				}
			}
		}),
		table.column({
			header: '',
			accessor: ({ id }) => id,
			cell: (item) => {
				return createRender(Actions, { id: item.value });
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, flatColumns, pluginStates } =
		table.createViewModel(columns);

	const { sortKeys } = pluginStates.sort;

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((c) => c.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const { filterValue } = pluginStates.filter;

	const hideableCols = ['nama', 'rekam_medis', 'ktp', 'tgl_lahir', 'jk', 'pendidikan'];
</script>

<!-- Display the table -->
<div class="w-full">
	<div class="flex items-center py-4">
		<!-- <Input class="max-w-sm" placeholder="Filter emails..." type="text" bind:value={$filterValue} /> -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="outline" class="ml-auto" builders={[builder]}>
					Kolom <ChevronDown class="w-4 h-4 ml-2" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{#each flatColumns as col}
					{#if hideableCols.includes(col.id)}
						<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
							{col.header}
						</DropdownMenu.CheckboxItem>
					{/if}
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<div class="border rounded-md">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class={cn('[&:has([role=checkbox])]:pl-3')}>
										{#if cell.id === 'nama' || cell.id === 'rekam_medis' || cell.id === 'jk' || cell.id === 'pendidikan'}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown
													class={cn(
														$sortKeys[0]?.id === cell.id && 'text-foreground',
														'ml-2 h-4 w-4'
													)}
												/>
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell class="[&:has([role=checkbox])]:pl-3" {...attrs}>
										{#if cell.id === 'amount'}
											<div class="font-medium text-right">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'status'}
											<div class="capitalize">
												<Render of={cell.render()} />
											</div>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
