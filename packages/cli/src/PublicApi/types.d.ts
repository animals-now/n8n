import type express from 'express';
import type { IDataObject, ExecutionStatus } from 'n8n-workflow';

import type { User } from '@db/entities/User';

import type { Role } from '@db/entities/Role';

import type { WorkflowEntity } from '@db/entities/WorkflowEntity';

import type * as UserManagementMailer from '@/UserManagement/email/UserManagementMailer';

import type { Risk } from '@/audit/types';

export type AuthlessRequest<
	RouteParams = {},
	ResponseBody = {},
	RequestBody = {},
	RequestQuery = {},
> = express.Request<RouteParams, ResponseBody, RequestBody, RequestQuery>;

export type AuthenticatedRequest<
	RouteParams = {},
	ResponseBody = {},
	RequestBody = {},
	RequestQuery = {},
> = express.Request<RouteParams, ResponseBody, RequestBody, RequestQuery> & {
	user: User;
	globalMemberRole?: Role;
	mailer?: UserManagementMailer.UserManagementMailer;
};

export type PaginatatedRequest = AuthenticatedRequest<
	{},
	{},
	{},
	{
		limit?: number;
		cursor?: string;
		offset?: number;
		lastId?: string;
	}
>;
export declare namespace ExecutionRequest {
	type GetAll = AuthenticatedRequest<
		{},
		{},
		{},
		{
			status?: ExecutionStatus;
			limit?: number;
			cursor?: string;
			offset?: number;
			includeData?: boolean;
			workflowId?: string;
			lastId?: string;
		}
	>;

	type Get = AuthenticatedRequest<{ id: string }, {}, {}, { includeData?: boolean }>;
	type Delete = Get;
}

export declare namespace CredentialTypeRequest {
	type Get = AuthenticatedRequest<{ credentialTypeName: string }, {}, {}, {}>;
}

export declare namespace WorkflowRequest {
	type GetAll = AuthenticatedRequest<
		{},
		{},
		{},
		{
			tags?: string;
			status?: ExecutionStatus;
			limit?: number;
			cursor?: string;
			offset?: number;
			workflowId?: number;
			active: boolean;
		}
	>;

	type Create = AuthenticatedRequest<{}, {}, WorkflowEntity, {}>;
	type Get = AuthenticatedRequest<{ id: string }, {}, {}, {}>;
	type Delete = Get;
	type Update = AuthenticatedRequest<{ id: string }, {}, WorkflowEntity, {}>;
	type Activate = Get;
}

export declare namespace UserRequest {
	export type Invite = AuthenticatedRequest<{}, {}, Array<{ email: string }>>;

	export type ResolveSignUp = AuthlessRequest<
		{},
		{},
		{},
		{ inviterId?: string; inviteeId?: string }
	>;

	export type SignUp = AuthenticatedRequest<
		{ id: string },
		{ inviterId?: string; inviteeId?: string }
	>;

	export type Delete = AuthenticatedRequest<
		{ id: string; email: string },
		{},
		{},
		{ transferId?: string; includeRole: boolean }
	>;

	export type Get = AuthenticatedRequest<
		{ id: string; email: string },
		{},
		{},
		{ limit?: number; offset?: number; cursor?: string; includeRole?: boolean }
	>;

	export type Reinvite = AuthenticatedRequest<{ id: string }>;

	export type Update = AuthlessRequest<
		{ id: string },
		{},
		{
			inviterId: string;
			firstName: string;
			lastName: string;
			password: string;
		}
	>;
}

export declare namespace CredentialRequest {
	type Create = AuthenticatedRequest<{}, {}, { type: string; name: string; data: IDataObject }, {}>;
}

export type OperationID = 'getUsers' | 'getUser';

type PaginationBase = { limit: number };

type PaginationOffsetDecoded = PaginationBase & { offset: number };

type PaginationCursorDecoded = PaginationBase & { lastId: string };

type OffsetPagination = PaginationBase & { offset: number; numberOfTotalRecords: number };

type CursorPagination = PaginationBase & { lastId: string; numberOfNextRecords: number };
export interface IRequired {
	required?: string[];
	not?: { required?: string[] };
}
export interface IDependency {
	if?: { properties: {} };
	then?: { allOf: IRequired[] };
	else?: { allOf: IRequired[] };
}

export interface IJsonSchema {
	additionalProperties: boolean;
	type: 'object';
	properties: { [key: string]: { type: string } };
	allOf?: IDependency[];
	required: string[];
}

// ----------------------------------
//           /audit
// ----------------------------------

export declare namespace AuditRequest {
	type Generate = AuthenticatedRequest<
		{},
		{},
		{ additionalOptions?: { categories?: Risk.Category[]; daysAbandonedWorkflow?: number } }
	>;
}
