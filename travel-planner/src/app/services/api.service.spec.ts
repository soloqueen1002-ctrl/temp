// src/app/services/api.service.specs.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for testing HTTP requests
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request with JSON data and call successCb', (done) => {
    const testUrl = '/test-api/json';
    const testModname = 'testModule';
    const testActionName = 'testAction';
    const testData = { key: 'value' };
    const mockResponse = { status: 'success', data: 'response' };

    let successCalled = false;
    let receivedResponse: any;

    service.call_http_post({
      url: testUrl,
      modname: testModname,
      actionName: testActionName,
      data: testData,
      successCb: (res) => {
        successCalled = true;
        receivedResponse = res;
      },
      completeCb: () => {
        // This will be called after success or error
        expect(successCalled).toBeTrue();
        expect(receivedResponse).toEqual(mockResponse);
        done(); // Signal that the async test is complete
      }
    });

    // Expect a single POST request to the test URL
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ ...testData, modname: testModname, actionName: testActionName });
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.headers.get('Authorization')).toBeDefined(); // Check if Authorization header is present

    // Respond with mock data
    req.flush(mockResponse);
  });

  it('should send a POST request with FormData and call successCb', (done) => {
    const testUrl = '/test-api/formdata';
    const testModname = 'formModule';
    const testData = new FormData();
    testData.append('param1', 'value1');
    const mockResponse = { status: 'success', data: 'form_response' };

    let successCalled = false;

    service.call_http_post({
      url: testUrl,
      modname: testModname,
      isFormData: true,
      data: testData,
      successCb: () => {
        successCalled = true;
      },
      completeCb: () => {
        expect(successCalled).toBeTrue();
        done();
      }
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('POST');
    // For FormData, checking the body directly is complex, often you'd check headers or specific appended values.
    // Here, we're just ensuring it's a FormData type.
    expect(req.request.body instanceof FormData).toBeTrue();
    expect(req.request.headers.get('Content-Type')).toBeNull(); // HttpClient usually sets this for FormData
    expect(req.request.headers.get('Authorization')).toBeDefined();

    req.flush(mockResponse);
  });

  it('should handle errors and call errorHandlerCb', (done) => {
    const testUrl = '/test-api/error';
    const testModname = 'errorModule';
    const mockError = { status: 500, statusText: 'Server Error' };

    let errorHandled = false;
    let afterErrorCalled = false;

    service.call_http_post({
      url: testUrl,
      modname: testModname,
      errorCb: (err) => {
        errorHandled = true;
        expect(err.status).toEqual(mockError.status);
      },
      afterError: (err) => {
        afterErrorCalled = true;
        expect(err.status).toEqual(mockError.status);
      },
      completeCb: () => {
        expect(errorHandled).toBeTrue();
        expect(afterErrorCalled).toBeTrue();
        done();
      }
    });

    const req = httpTestingController.expectOne(testUrl);
    req.flush('Error occurred', mockError); // Simulate an error response
  });

  it('should control spinner visibility', (done) => {
    const testUrl = '/test-api/spinner';
    const testModname = 'spinnerModule';
    const mockResponse = {};

    // Spy on the private show_spinner property (for demonstration, generally avoid testing private state)
    // A better approach would be to test a public method that changes the spinner state
    // or to test the UI directly if a spinner component is bound to this state.
    let spinnerStateBefore: boolean;
    let spinnerStateAfter: boolean;

    // Directly access the private property for testing purposes as a workaround
    // In a real app, you'd expose this via an Observable or a public getter.
    const serviceAny = service as any;

    service.call_http_post({
      url: testUrl,
      modname: testModname,
      successCb: () => {},
      completeCb: () => {
        spinnerStateAfter = serviceAny.show_spinner;
        expect(spinnerStateBefore).toBeTrue(); // Should be true during request
        expect(spinnerStateAfter).toBeFalse(); // Should be false after completion
        done();
      }
    });

    spinnerStateBefore = serviceAny.show_spinner;
    const req = httpTestingController.expectOne(testUrl);
    req.flush(mockResponse);
  });
});
